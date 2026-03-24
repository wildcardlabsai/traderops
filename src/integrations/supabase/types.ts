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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          priority: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          priority?: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          priority?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company_name: string
          contact_name: string | null
          created_at: string
          email: string | null
          id: string
          location: string | null
          notes: string | null
          phone: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name: string
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          phone?: string | null
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          phone?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      deals: {
        Row: {
          contact_id: string | null
          created_at: string
          id: string
          notes: string | null
          party_name: string
          stage: string
          updated_at: string
          user_id: string
          value: number | null
          vehicle_id: string | null
          vehicle_name: string
        }
        Insert: {
          contact_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          party_name: string
          stage?: string
          updated_at?: string
          user_id: string
          value?: number | null
          vehicle_id?: string | null
          vehicle_name: string
        }
        Update: {
          contact_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          party_name?: string
          stage?: string
          updated_at?: string
          user_id?: string
          value?: number | null
          vehicle_id?: string | null
          vehicle_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "deals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          amount: number | null
          created_at: string
          doc_date: string
          doc_type: string
          id: string
          name: string
          notes: string | null
          party_name: string | null
          updated_at: string
          user_id: string
          vehicle_name: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          doc_date?: string
          doc_type?: string
          id?: string
          name: string
          notes?: string | null
          party_name?: string | null
          updated_at?: string
          user_id: string
          vehicle_name?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          doc_date?: string
          doc_type?: string
          id?: string
          name?: string
          notes?: string | null
          party_name?: string | null
          updated_at?: string
          user_id?: string
          vehicle_name?: string | null
        }
        Relationships: []
      }
      movements: {
        Row: {
          created_at: string
          driver: string | null
          from_location: string
          id: string
          notes: string | null
          scheduled_date: string | null
          status: string
          to_location: string
          updated_at: string
          user_id: string
          vehicle_id: string | null
          vehicle_name: string
        }
        Insert: {
          created_at?: string
          driver?: string | null
          from_location: string
          id?: string
          notes?: string | null
          scheduled_date?: string | null
          status?: string
          to_location: string
          updated_at?: string
          user_id: string
          vehicle_id?: string | null
          vehicle_name: string
        }
        Update: {
          created_at?: string
          driver?: string | null
          from_location?: string
          id?: string
          notes?: string | null
          scheduled_date?: string | null
          status?: string
          to_location?: string
          updated_at?: string
          user_id?: string
          vehicle_id?: string | null
          vehicle_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "movements_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string
          id: string
          location: string | null
          phone: string | null
          plan_expires_at: string | null
          plan_status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          id?: string
          location?: string | null
          phone?: string | null
          plan_expires_at?: string | null
          plan_status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          id?: string
          location?: string | null
          phone?: string | null
          plan_expires_at?: string | null
          plan_status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          admin_notes: string | null
          created_at: string
          description: string
          id: string
          priority: string
          status: string
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          description: string
          id?: string
          priority?: string
          status?: string
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          description?: string
          id?: string
          priority?: string
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          asking_price: number | null
          colour: string | null
          cost_price: number | null
          created_at: string
          days_in_stock: number | null
          fuel_type: string | null
          id: string
          make: string
          mileage: number | null
          model: string
          notes: string | null
          registration: string | null
          status: string
          transmission: string | null
          updated_at: string
          urgent: boolean | null
          user_id: string
          year: number
        }
        Insert: {
          asking_price?: number | null
          colour?: string | null
          cost_price?: number | null
          created_at?: string
          days_in_stock?: number | null
          fuel_type?: string | null
          id?: string
          make: string
          mileage?: number | null
          model: string
          notes?: string | null
          registration?: string | null
          status?: string
          transmission?: string | null
          updated_at?: string
          urgent?: boolean | null
          user_id: string
          year: number
        }
        Update: {
          asking_price?: number | null
          colour?: string | null
          cost_price?: number | null
          created_at?: string
          days_in_stock?: number | null
          fuel_type?: string | null
          id?: string
          make?: string
          mileage?: number | null
          model?: string
          notes?: string | null
          registration?: string | null
          status?: string
          transmission?: string | null
          updated_at?: string
          urgent?: boolean | null
          user_id?: string
          year?: number
        }
        Relationships: []
      }
      wanted_posts: {
        Row: {
          budget: string | null
          created_at: string
          id: string
          matches: number
          notes: string | null
          status: string
          updated_at: string
          user_id: string
          vehicle_description: string
        }
        Insert: {
          budget?: string | null
          created_at?: string
          id?: string
          matches?: number
          notes?: string | null
          status?: string
          updated_at?: string
          user_id: string
          vehicle_description: string
        }
        Update: {
          budget?: string | null
          created_at?: string
          id?: string
          matches?: number
          notes?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          vehicle_description?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
