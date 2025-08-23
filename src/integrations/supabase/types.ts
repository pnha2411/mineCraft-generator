export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      badge_nft_requests: {
        Row: {
          chain: string | null
          id: number
          mint_status: string | null
          minted_at: string | null
          tx_hash: string | null
          user_badge_id: number | null
        }
        Insert: {
          chain?: string | null
          id?: number
          mint_status?: string | null
          minted_at?: string | null
          tx_hash?: string | null
          user_badge_id?: number | null
        }
        Update: {
          chain?: string | null
          id?: number
          mint_status?: string | null
          minted_at?: string | null
          tx_hash?: string | null
          user_badge_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "badge_nft_requests_user_badge_id_fkey"
            columns: ["user_badge_id"]
            isOneToOne: false
            referencedRelation: "user_badges"
            referencedColumns: ["id"]
          },
        ]
      }
      badge_templates: {
        Row: {
          category: string | null
          created_at: string | null
          criteria_json: Json
          description: string | null
          icon_url: string | null
          id: number
          is_active: boolean | null
          name: string
          onchain_metadata: Json | null
          slug: string
          tiers_json: Json | null
          transferable: boolean | null
          updated_at: string | null
          xp_reward: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          criteria_json: Json
          description?: string | null
          icon_url?: string | null
          id?: number
          is_active?: boolean | null
          name: string
          onchain_metadata?: Json | null
          slug: string
          tiers_json?: Json | null
          transferable?: boolean | null
          updated_at?: string | null
          xp_reward?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          criteria_json?: Json
          description?: string | null
          icon_url?: string | null
          id?: number
          is_active?: boolean | null
          name?: string
          onchain_metadata?: Json | null
          slug?: string
          tiers_json?: Json | null
          transferable?: boolean | null
          updated_at?: string | null
          xp_reward?: number | null
        }
        Relationships: []
      }
      badge_xp_log: {
        Row: {
          created_at: string | null
          id: number
          reason: string | null
          user_badge_id: number | null
          user_id: string
          xp_amount: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          reason?: string | null
          user_badge_id?: number | null
          user_id: string
          xp_amount: number
        }
        Update: {
          created_at?: string | null
          id?: number
          reason?: string | null
          user_badge_id?: number | null
          user_id?: string
          xp_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "badge_xp_log_user_badge_id_fkey"
            columns: ["user_badge_id"]
            isOneToOne: false
            referencedRelation: "user_badges"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: number
          chain: string
          crosschain_ref: string | null
          donor_address: string
          id: string
          post_id: string | null
          timestamp: string | null
          token_address: string
          tx_hash: string
        }
        Insert: {
          amount: number
          chain: string
          crosschain_ref?: string | null
          donor_address: string
          id?: string
          post_id?: string | null
          timestamp?: string | null
          token_address: string
          tx_hash: string
        }
        Update: {
          amount?: number
          chain?: string
          crosschain_ref?: string | null
          donor_address?: string
          id?: string
          post_id?: string | null
          timestamp?: string | null
          token_address?: string
          tx_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "donations_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_flags: {
        Row: {
          enabled: boolean
          name: string
          updated_at: string | null
        }
        Insert: {
          enabled?: boolean
          name: string
          updated_at?: string | null
        }
        Update: {
          enabled?: boolean
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      packages: {
        Row: {
          id: string
          ipfshash: string
          name: string
          pricewei: string
        }
        Insert: {
          id: string
          ipfshash: string
          name: string
          pricewei: string
        }
        Update: {
          id?: string
          ipfshash?: string
          name?: string
          pricewei?: string
        }
        Relationships: []
      }
      pools: {
        Row: {
          asset: string
          created_at: string
          current_balance: number
          end_date: string
          id: string
          interest_rate: number
          name: string
          start_date: string
          status: string
          total_capacity: number
          updated_at: string
        }
        Insert: {
          asset?: string
          created_at?: string
          current_balance?: number
          end_date: string
          id?: string
          interest_rate: number
          name: string
          start_date: string
          status?: string
          total_capacity: number
          updated_at?: string
        }
        Update: {
          asset?: string
          created_at?: string
          current_balance?: number
          end_date?: string
          id?: string
          interest_rate?: number
          name?: string
          start_date?: string
          status?: string
          total_capacity?: number
          updated_at?: string
        }
        Relationships: []
      }
      post_reports: {
        Row: {
          created_at: string | null
          id: string
          post_id: string | null
          reason: string
          reporter_address: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          reason: string
          reporter_address: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          reason?: string
          reporter_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_reports_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_address: string
          content_cid: string
          created_at: string | null
          description: string | null
          id: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_address: string
          content_cid: string
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_address?: string
          content_cid?: string
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          asset: string
          created_at: string
          description: string | null
          id: string
          pool_id: string | null
          reference_id: string | null
          status: string
          transaction_date: string
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          asset?: string
          created_at?: string
          description?: string | null
          id?: string
          pool_id?: string | null
          reference_id?: string | null
          status?: string
          transaction_date?: string
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          asset?: string
          created_at?: string
          description?: string | null
          id?: string
          pool_id?: string | null
          reference_id?: string | null
          status?: string
          transaction_date?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "pools"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_template_id: number
          evidence_json: Json | null
          id: number
          issued_at: string | null
          issued_by: string
          revoked_at: string | null
          tier: Json | null
          user_id: string
        }
        Insert: {
          badge_template_id: number
          evidence_json?: Json | null
          id?: number
          issued_at?: string | null
          issued_by?: string
          revoked_at?: string | null
          tier?: Json | null
          user_id: string
        }
        Update: {
          badge_template_id?: number
          evidence_json?: Json | null
          id?: number
          issued_at?: string | null
          issued_by?: string
          revoked_at?: string | null
          tier?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_template_id_fkey"
            columns: ["badge_template_id"]
            isOneToOne: false
            referencedRelation: "badge_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      user_portfolios: {
        Row: {
          amount_invested: number
          created_at: string
          id: string
          last_deposit_date: string
          last_withdrawal_date: string | null
          pool_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_invested?: number
          created_at?: string
          id?: string
          last_deposit_date: string
          last_withdrawal_date?: string | null
          pool_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_invested?: number
          created_at?: string
          id?: string
          last_deposit_date?: string
          last_withdrawal_date?: string | null
          pool_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_portfolios_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "pools"
            referencedColumns: ["id"]
          },
        ]
      }
      user_purchases: {
        Row: {
          id: string
          ipfshash: string | null
          package_id: string
          packagename: string | null
          pricewei: string
          style: number | null
          timestamp: string
          tx_hash: string | null
          user_address: string
        }
        Insert: {
          id?: string
          ipfshash?: string | null
          package_id: string
          packagename?: string | null
          pricewei: string
          style?: number | null
          timestamp: string
          tx_hash?: string | null
          user_address: string
        }
        Update: {
          id?: string
          ipfshash?: string | null
          package_id?: string
          packagename?: string | null
          pricewei?: string
          style?: number | null
          timestamp?: string
          tx_hash?: string | null
          user_address?: string
        }
        Relationships: []
      }
      user_styles: {
        Row: {
          style: number
          user_address: string
        }
        Insert: {
          style: number
          user_address: string
        }
        Update: {
          style?: number
          user_address?: string
        }
        Relationships: []
      }
      user_transactions: {
        Row: {
          id: string
          ipfs_hash: string | null
          package_id: string
          package_name: string | null
          price_wei: string
          style: number | null
          timestamp: string
          tx_hash: string
          user_address: string
        }
        Insert: {
          id?: string
          ipfs_hash?: string | null
          package_id: string
          package_name?: string | null
          price_wei: string
          style?: number | null
          timestamp: string
          tx_hash: string
          user_address: string
        }
        Update: {
          id?: string
          ipfs_hash?: string | null
          package_id?: string
          package_name?: string | null
          price_wei?: string
          style?: number | null
          timestamp?: string
          tx_hash?: string
          user_address?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          address: string
          created_at: string | null
          display_name: string | null
          profile_metadata_cid: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          display_name?: string | null
          profile_metadata_cid?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          display_name?: string | null
          profile_metadata_cid?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      issue_badge_with_xp: {
        Args: { p_evidence: Json; p_template_slug: string; p_user_id: string }
        Returns: {
          user_badge_id: number
          xp_awarded: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
