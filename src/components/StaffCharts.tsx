'use client'

import { Title, Text, Metric, BarChart, DonutChart, Flex } from '@tremor/react'
import { StaffData, StaffMember } from '@/lib/types/Staff.types'
import staffDataJson from '@/lib/data/staff_data.json'
import { useMemo } from 'react'

const staffData = new StaffData(staffDataJson as unknown as StaffMember[])

export default function StaffCharts() {
    const metrics = useMemo(() => {
        const total = staffData.getTotalCount()
        const active = staffData.getActiveMembers().length
        const inactive = total - active
        const avgSeniority = staffData.getAverageSeniorityYears()
        const newcomers = staffData.getNewcomers().length
        const experienced = staffData.getExperiencedStaff().length

        return {
            total,
            active,
            inactive,
            avgSeniority,
            newcomers,
            experienced
        }
    }, [])

    const seniorityData = useMemo(() => staffData.getSeniorityStats(), [])
    const activityData = useMemo(() => staffData.getActivityStats(), [])
    const participationData = useMemo(() => staffData.getParticipationStats(), [])

    const valueFormatter = (number: number) => Intl.NumberFormat('fr-FR').format(number).toString()

    return (
        <div className="space-y-6">
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#234A6F', marginBottom: '24px' }}>
                Analyse des Effectifs
            </h2>

            {/* KPI Cards */}
            <div className="dashboard-stats-grid">
                <div className="dashboard-stat-card" style={{ borderTop: '3px solid #234A6F' }}>
                    <Text>Total Membres</Text>
                    <Metric>{metrics.total}</Metric>
                </div>
                <div className="dashboard-stat-card" style={{ borderTop: '3px solid #E68B3A' }}>
                    <Text>Membres Actifs</Text>
                    <Metric>{metrics.active}</Metric>
                    <Text className="mt-2 text-sm text-gray-500">
                        {((metrics.active / metrics.total) * 100).toFixed(1)}% de l&apos;effectif
                    </Text>
                </div>
                <div className="dashboard-stat-card" style={{ borderTop: '3px solid #234A6F' }}>
                    <Text>Ancienneté Moyenne</Text>
                    <Metric>{metrics.avgSeniority} ans</Metric>
                </div>
                <div className="dashboard-stat-card" style={{ borderTop: '3px solid #E68B3A' }}>
                    <Text>Nouveaux / Expérimentés</Text>
                    <Flex justifyContent="start" className="space-x-2 mt-1">
                        <Metric>{metrics.newcomers}</Metric>
                        <Text>/</Text>
                        <Metric>{metrics.experienced}</Metric>
                    </Flex>
                    <Text className="mt-2 text-sm text-gray-500">
                        Ratio: {(metrics.newcomers / (metrics.experienced || 1)).toFixed(2)}
                    </Text>
                </div>
            </div>

            {/* Charts Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '24px',
                marginTop: '24px'
            }}
                className="lg:grid-cols-2">
                {/* Seniority Distribution */}
                <div className="dashboard-card">
                    <div style={{ padding: '24px' }} className="chart-navy">
                        <Title>Distribution par Ancienneté</Title>
                        <Text>Répartition des membres par années de service</Text>
                        <BarChart
                            className="mt-6 h-72"
                            data={seniorityData}
                            index="label"
                            categories={["count"]}
                            colors={["blue"]}
                            valueFormatter={valueFormatter}
                            yAxisWidth={48}
                            showLegend={false}
                        />
                    </div>
                </div>

                {/* Activity Status */}
                <div className="dashboard-card">
                    <div style={{ padding: '24px' }} className="chart-donut">
                        <Title>Statut d&apos;Activité</Title>
                        <Text>Proportion de membres actifs vs inactifs</Text>
                        <DonutChart
                            className="mt-6 h-72"
                            data={activityData}
                            category="count"
                            index="label"
                            valueFormatter={valueFormatter}
                            colors={["orange", "slate"]}
                            showLabel={true}
                        />
                    </div>
                </div>

                {/* Participation Frequency */}
                <div className="dashboard-card lg:col-span-2">
                    <div style={{ padding: '24px' }} className="chart-terracotta">
                        <Title>Fréquence de Participation</Title>
                        <Text>Temps écoulé depuis la dernière activité</Text>
                        <BarChart
                            className="mt-6 h-72"
                            data={participationData}
                            index="label"
                            categories={["count"]}
                            colors={["orange"]}
                            valueFormatter={valueFormatter}
                            yAxisWidth={48}
                            showLegend={false}
                        />
                    </div>
                </div>
            </div>

            {/* Additional Analytics - Second Row */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '24px',
                marginTop: '24px'
            }}
                className="lg:grid-cols-2">
                {/* Top Entities */}
                <div className="dashboard-card">
                    <div style={{ padding: '24px' }} className="chart-navy">
                        <Title>Top 5 Entités</Title>
                        <Text>Répartition des membres par section</Text>
                        <BarChart
                            className="mt-6 h-72"
                            data={staffData.getTopEntities(5)}
                            index="label"
                            categories={["count"]}
                            colors={["blue"]}
                            valueFormatter={valueFormatter}
                            yAxisWidth={60}
                            showLegend={false}
                            layout="horizontal"
                        />
                    </div>
                </div>

                {/* Experience Levels */}
                <div className="dashboard-card">
                    <div style={{ padding: '24px' }} className="chart-donut">
                        <Title>Niveaux d&apos;Expérience</Title>
                        <Text>Distribution nouveaux/intermédiaires/expérimentés</Text>
                        <DonutChart
                            className="mt-6 h-72"
                            data={staffData.getExperienceLevels()}
                            category="count"
                            index="label"
                            valueFormatter={valueFormatter}
                            colors={["orange", "blue", "slate"]}
                            showLabel={true}
                        />
                    </div>
                </div>

                {/* Engagement Levels */}
                <div className="dashboard-card">
                    <div style={{ padding: '24px' }} className="chart-terracotta">
                        <Title>Niveaux d&apos;Engagement</Title>
                        <Text>Activité basée sur la dernière participation</Text>
                        <BarChart
                            className="mt-6 h-72"
                            data={staffData.getEngagementLevels()}
                            index="label"
                            categories={["count"]}
                            colors={["orange"]}
                            valueFormatter={valueFormatter}
                            yAxisWidth={48}
                            showLegend={false}
                        />
                    </div>
                </div>

                {/* Retention by Seniority */}
                <div className="dashboard-card">
                    <div style={{ padding: '24px' }} className="chart-navy">
                        <Title>Taux de Rétention</Title>
                        <Text>Pourcentage de membres actifs par ancienneté</Text>
                        <BarChart
                            className="mt-6 h-72"
                            data={staffData.getRetentionBySeniority()}
                            index="label"
                            categories={["activeRate"]}
                            colors={["blue"]}
                            valueFormatter={(number) => `${number}%`}
                            yAxisWidth={48}
                            showLegend={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
