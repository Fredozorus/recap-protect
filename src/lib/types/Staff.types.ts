/**
 * Interface représentant un membre du staff de la Protection Civile
 */
export interface StaffMember {
  /** Identifiant unique du membre */
  staff_uuid: number;

  /** Date d'entrée dans l'organisation (ISO 8601) */
  entry_date: string;

  /** Ancienneté en jours */
  seniority: number;

  /** Indique si le membre est nouveau (< 1 an) */
  is_new_comer: boolean;

  /** Indique si le membre est expérimenté (> 5 ans) */
  is_experimented_staff: boolean;

  /** Nom complet pour l'affichage */
  display_name: string;

  /** Nom de famille */
  lastname: string;

  /** Prénom */
  firstname: string;

  /** Entité/Section (ex: 75-17 pour Paris 17e) */
  entity: string;

  /** Nombre de jours depuis la dernière participation (peut être null) */
  n_days_since_last_participation: string | null;

  /** Indique si le membre est actuellement actif */
  is_active: boolean;
}

/**
 * Classe utilitaire pour manipuler les données du staff
 */
export class StaffData {
  private members: StaffMember[];

  constructor(members: StaffMember[]) {
    this.members = members;
  }

  /**
   * Retourne tous les membres
   */
  getAll(): StaffMember[] {
    return this.members;
  }

  /**
   * Retourne uniquement les membres actifs
   */
  getActiveMembers(): StaffMember[] {
    return this.members.filter(member => member.is_active);
  }

  /**
   * Retourne les nouveaux arrivants
   */
  getNewcomers(): StaffMember[] {
    return this.members.filter(member => member.is_new_comer);
  }

  /**
   * Retourne les membres expérimentés
   */
  getExperiencedStaff(): StaffMember[] {
    return this.members.filter(member => member.is_experimented_staff);
  }

  /**
   * Retourne les statistiques d'ancienneté pour les graphiques
   */
  getSeniorityStats(): { label: string; count: number }[] {
    const ranges = [
      { label: '< 1 an', min: 0, max: 365 },
      { label: '1-2 ans', min: 365, max: 730 },
      { label: '2-5 ans', min: 730, max: 1825 },
      { label: '5-10 ans', min: 1825, max: 3650 },
      { label: '> 10 ans', min: 3650, max: Infinity }
    ];

    return ranges.map(range => ({
      label: range.label,
      count: this.members.filter(
        member => member.seniority >= range.min && member.seniority < range.max
      ).length
    }));
  }

  /**
   * Retourne la répartition actif/inactif
   */
  getActivityStats(): { label: string; count: number }[] {
    const active = this.members.filter(m => m.is_active).length;
    const inactive = this.members.length - active;

    return [
      { label: 'Actifs', count: active },
      { label: 'Inactifs', count: inactive }
    ];
  }

  /**
   * Retourne les stats de dernière participation (pour graphique)
   */
  getParticipationStats(): { label: string; count: number }[] {
    const ranges = [
      { label: '< 7 jours', min: 0, max: 7 },
      { label: '1-4 semaines', min: 7, max: 28 },
      { label: '1-3 mois', min: 28, max: 90 },
      { label: '3-6 mois', min: 90, max: 180 },
      { label: '> 6 mois', min: 180, max: Infinity }
    ];

    return ranges.map(range => ({
      label: range.label,
      count: this.members.filter(member => {
        if (!member.n_days_since_last_participation) return false;
        const days = parseFloat(member.n_days_since_last_participation);
        return days >= range.min && days < range.max;
      }).length
    }));
  }

  /**
   * Retourne le nombre total de membres
   */
  getTotalCount(): number {
    return this.members.length;
  }

  /**
   * Retourne l'ancienneté moyenne en jours
   */
  getAverageSeniority(): number {
    const total = this.members.reduce((sum, member) => sum + member.seniority, 0);
    return Math.round(total / this.members.length);
  }

  /**
   * Retourne l'ancienneté moyenne en années
   */
  getAverageSeniorityYears(): number {
    return Math.round((this.getAverageSeniority() / 365) * 10) / 10;
  }

  /**
   * Retourne la distribution par entité
   */
  getEntityStats(): { label: string; count: number }[] {
    const entityMap = new Map<string, number>();

    this.members.forEach(member => {
      const count = entityMap.get(member.entity) || 0;
      entityMap.set(member.entity, count + 1);
    });

    return Array.from(entityMap.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Retourne les niveaux d'engagement basés sur la participation
   */
  getEngagementLevels(): { label: string; count: number }[] {
    const levels = [
      { label: 'Très actif (< 7j)', min: 0, max: 7 },
      { label: 'Actif (7-30j)', min: 7, max: 30 },
      { label: 'Modéré (1-3 mois)', min: 30, max: 90 },
      { label: 'Faible (> 3 mois)', min: 90, max: Infinity }
    ];

    return levels.map(level => ({
      label: level.label,
      count: this.members.filter(member => {
        if (!member.n_days_since_last_participation) return false;
        const days = parseFloat(member.n_days_since_last_participation);
        return days >= level.min && days < level.max;
      }).length
    }));
  }

  /**
   * Retourne le taux de rétention par tranche d'ancienneté
   */
  getRetentionBySeniority(): { label: string; activeRate: number }[] {
    const ranges = [
      { label: '< 1 an', min: 0, max: 365 },
      { label: '1-2 ans', min: 365, max: 730 },
      { label: '2-5 ans', min: 730, max: 1825 },
      { label: '> 5 ans', min: 1825, max: Infinity }
    ];

    return ranges.map(range => {
      const inRange = this.members.filter(
        m => m.seniority >= range.min && m.seniority < range.max
      );
      const activeInRange = inRange.filter(m => m.is_active).length;
      const activeRate = inRange.length > 0
        ? Math.round((activeInRange / inRange.length) * 100)
        : 0;

      return {
        label: range.label,
        activeRate
      };
    });
  }

  /**
   * Retourne les top entités par nombre de membres
   */
  getTopEntities(limit: number = 5): { label: string; count: number }[] {
    return this.getEntityStats().slice(0, limit);
  }

  /**
   * Retourne le pourcentage de membres actifs
   */
  getActivePercentage(): number {
    const active = this.members.filter(m => m.is_active).length;
    return Math.round((active / this.members.length) * 100);
  }

  /**
   * Retourne la distribution nouveaux/intermédiaires/expérimentés
   */
  getExperienceLevels(): { label: string; count: number }[] {
    const newcomers = this.members.filter(m => m.is_new_comer).length;
    const experienced = this.members.filter(m => m.is_experimented_staff).length;
    const intermediate = this.members.length - newcomers - experienced;

    return [
      { label: 'Nouveaux (< 1 an)', count: newcomers },
      { label: 'Intermédiaires (1-5 ans)', count: intermediate },
      { label: 'Expérimentés (> 5 ans)', count: experienced }
    ];
  }
}