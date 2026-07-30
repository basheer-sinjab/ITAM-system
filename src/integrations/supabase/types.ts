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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      app_settings: {
        Row: {
          dashboard_alerts_enabled: boolean
          id: boolean
          low_stock_threshold: number
          updated_at: string
          warranty_alert_days: number
        }
        Insert: {
          dashboard_alerts_enabled?: boolean
          id?: boolean
          low_stock_threshold?: number
          updated_at?: string
          warranty_alert_days?: number
        }
        Update: {
          dashboard_alerts_enabled?: boolean
          id?: boolean
          low_stock_threshold?: number
          updated_at?: string
          warranty_alert_days?: number
        }
        Relationships: []
      }
      branches: {
        Row: {
          created_at: string
          id: string
          name: string
          notes: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          notes?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
        }
        Relationships: []
      }
      departments: {
        Row: {
          created_at: string
          id: string
          name: string
          notes: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          notes?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
        }
        Relationships: []
      }
      maintenance_records: {
        Row: {
          created_at: string
          description: string | null
          id: string
          maintenance_type: Database["public"]["Enums"]["maintenance_type"]
          printer_id: string
          replaced_parts: string[]
          service_date: string
          technician: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          maintenance_type?: Database["public"]["Enums"]["maintenance_type"]
          printer_id: string
          replaced_parts?: string[]
          service_date?: string
          technician?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          maintenance_type?: Database["public"]["Enums"]["maintenance_type"]
          printer_id?: string
          replaced_parts?: string[]
          service_date?: string
          technician?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_records_printer_id_fkey"
            columns: ["printer_id"]
            isOneToOne: false
            referencedRelation: "printers"
            referencedColumns: ["id"]
          },
        ]
      }
      parts: {
        Row: {
          created_at: string
          id: string
          name: string
          notes: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          notes?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
        }
        Relationships: []
      }
      printer_transfers: {
        Row: {
          created_at: string
          id: string
          new_department: string | null
          new_person: string | null
          notes: string | null
          old_department: string | null
          old_person: string | null
          printer_id: string
          transfer_date: string
        }
        Insert: {
          created_at?: string
          id?: string
          new_department?: string | null
          new_person?: string | null
          notes?: string | null
          old_department?: string | null
          old_person?: string | null
          printer_id: string
          transfer_date?: string
        }
        Update: {
          created_at?: string
          id?: string
          new_department?: string | null
          new_person?: string | null
          notes?: string | null
          old_department?: string | null
          old_person?: string | null
          printer_id?: string
          transfer_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "printer_transfers_printer_id_fkey"
            columns: ["printer_id"]
            isOneToOne: false
            referencedRelation: "printers"
            referencedColumns: ["id"]
          },
        ]
      }
      printers: {
        Row: {
          asset_id: string
          branch_id: string | null
          created_at: string
          department_id: string | null
          id: string
          image_url: string | null
          ip_address: string | null
          is_favorite: boolean
          mac_address: string | null
          manufacturer: string | null
          model: string | null
          name: string
          notes: string | null
          printer_type: string | null
          purchase_date: string | null
          responsible_person_id: string | null
          serial_number: string | null
          status: Database["public"]["Enums"]["printer_status"]
          updated_at: string
          warranty_expiry: string | null
        }
        Insert: {
          asset_id?: string
          branch_id?: string | null
          created_at?: string
          department_id?: string | null
          id?: string
          image_url?: string | null
          ip_address?: string | null
          is_favorite?: boolean
          mac_address?: string | null
          manufacturer?: string | null
          model?: string | null
          name: string
          notes?: string | null
          printer_type?: string | null
          purchase_date?: string | null
          responsible_person_id?: string | null
          serial_number?: string | null
          status?: Database["public"]["Enums"]["printer_status"]
          updated_at?: string
          warranty_expiry?: string | null
        }
        Update: {
          asset_id?: string
          branch_id?: string | null
          created_at?: string
          department_id?: string | null
          id?: string
          image_url?: string | null
          ip_address?: string | null
          is_favorite?: boolean
          mac_address?: string | null
          manufacturer?: string | null
          model?: string | null
          name?: string
          notes?: string | null
          printer_type?: string | null
          purchase_date?: string | null
          responsible_person_id?: string | null
          serial_number?: string | null
          status?: Database["public"]["Enums"]["printer_status"]
          updated_at?: string
          warranty_expiry?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "printers_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "printers_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "printers_responsible_person_id_fkey"
            columns: ["responsible_person_id"]
            isOneToOne: false
            referencedRelation: "responsible_persons"
            referencedColumns: ["id"]
          },
        ]
      }
      responsible_persons: {
        Row: {
          created_at: string
          id: string
          name: string
          notes: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          notes?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          contact_person: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
        }
        Insert: {
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
        }
        Update: {
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      toner_replacement_items: {
        Row: {
          created_at: string
          id: string
          quantity: number
          replacement_id: string
          toner_id: string | null
          toner_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          quantity?: number
          replacement_id: string
          toner_id?: string | null
          toner_name: string
        }
        Update: {
          created_at?: string
          id?: string
          quantity?: number
          replacement_id?: string
          toner_id?: string | null
          toner_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "toner_replacement_items_replacement_id_fkey"
            columns: ["replacement_id"]
            isOneToOne: false
            referencedRelation: "toner_replacements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "toner_replacement_items_toner_id_fkey"
            columns: ["toner_id"]
            isOneToOne: false
            referencedRelation: "toners"
            referencedColumns: ["id"]
          },
        ]
      }
      toner_replacements: {
        Row: {
          change_date: string
          created_at: string
          id: string
          notes: string | null
          printer_id: string
        }
        Insert: {
          change_date?: string
          created_at?: string
          id?: string
          notes?: string | null
          printer_id: string
        }
        Update: {
          change_date?: string
          created_at?: string
          id?: string
          notes?: string | null
          printer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "toner_replacements_printer_id_fkey"
            columns: ["printer_id"]
            isOneToOne: false
            referencedRelation: "printers"
            referencedColumns: ["id"]
          },
        ]
      }
      toner_stock_entries: {
        Row: {
          created_at: string
          entry_date: string
          id: string
          notes: string | null
          quantity: number
          toner_id: string
        }
        Insert: {
          created_at?: string
          entry_date?: string
          id?: string
          notes?: string | null
          quantity: number
          toner_id: string
        }
        Update: {
          created_at?: string
          entry_date?: string
          id?: string
          notes?: string | null
          quantity?: number
          toner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "toner_stock_entries_toner_id_fkey"
            columns: ["toner_id"]
            isOneToOne: false
            referencedRelation: "toners"
            referencedColumns: ["id"]
          },
        ]
      }
      toners: {
        Row: {
          code: string | null
          color: Database["public"]["Enums"]["toner_color"]
          created_at: string
          id: string
          min_quantity: number
          name: string
          notes: string | null
          quantity: number
          supplier_id: string | null
          updated_at: string
        }
        Insert: {
          code?: string | null
          color?: Database["public"]["Enums"]["toner_color"]
          created_at?: string
          id?: string
          min_quantity?: number
          name: string
          notes?: string | null
          quantity?: number
          supplier_id?: string | null
          updated_at?: string
        }
        Update: {
          code?: string | null
          color?: Database["public"]["Enums"]["toner_color"]
          created_at?: string
          id?: string
          min_quantity?: number
          name?: string
          notes?: string | null
          quantity?: number
          supplier_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "toners_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      next_asset_id: { Args: never; Returns: string }
    }
    Enums: {
      maintenance_type:
        | "repair"
        | "part_replacement"
        | "cleaning"
        | "preventive"
        | "setup"
        | "other"
      printer_status: "active" | "maintenance" | "out_of_service" | "retired"
      toner_color: "black" | "cyan" | "magenta" | "yellow" | "other"
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
      maintenance_type: [
        "repair",
        "part_replacement",
        "cleaning",
        "preventive",
        "setup",
        "other",
      ],
      printer_status: ["active", "maintenance", "out_of_service", "retired"],
      toner_color: ["black", "cyan", "magenta", "yellow", "other"],
    },
  },
} as const
