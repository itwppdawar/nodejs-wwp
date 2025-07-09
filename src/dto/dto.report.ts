export interface ISalesReport {
	readonly id?: number;
	readonly company: string;
	readonly sales_order: string;
	readonly po_number?: string | null;
	readonly so_date?: string | null;
	readonly invoice?: string | null;
	readonly external_invoice: string;
	readonly invoice_date?: Date | null;
	readonly due_date?: Date | null;
	readonly invoice_account?: string | null;
	readonly name?: string | null;
	readonly address_group?: string | null;
	readonly packslip_date?: Date | null;
	readonly packing_slip?: string | null;
	readonly external_packing_slip?: string | null;
	readonly sales?: string | null;
}

export class SalesReportDTO implements ISalesReport {
	readonly id?: number;
	readonly company: string;
	readonly sales_order: string;
	readonly po_number?: string | null;
	readonly so_date?: string | null;
	readonly invoice?: string | null;
	readonly external_invoice: string;
	readonly invoice_date?: Date | null;
	readonly due_date?: Date | null;
	readonly invoice_account?: string | null;
	readonly name?: string | null;
	readonly address_group?: string | null;
	readonly packslip_date?: Date | null;
	readonly packing_slip?: string | null;
	readonly external_packing_slip?: string | null;
	readonly sales?: string | null;
}

export interface IItemReport {
	readonly id?: number;
	readonly sales_id: number;
	readonly item_number: string;
	readonly item_name_origin?: string | null;
	readonly item_name?: string | null;
	readonly group_product?: string | null;
	readonly thickness?: string | null;
	readonly length?: string | null;
	readonly length_m?: string | null;
	readonly color_type: string;
	readonly size_width: string;
	readonly qty: number;
	readonly unit: string;
	readonly qty_in_kg_ppic?: string | null;
	readonly qty_in_kg_mkt?: string | null;
}

export class ItemReportDTO implements IItemReport {
	readonly id?: number;
	readonly sales_id: number;
	readonly item_number: string;
	readonly item_name_origin?: string | null;
	readonly item_name?: string | null;
	readonly group_product?: string | null;
	readonly thickness?: string | null;
	readonly length?: string | null;
	readonly length_m?: string | null;
	readonly color_type: string;
	readonly size_width: string;
	readonly qty: number;
	readonly unit: string;
	readonly qty_in_kg_ppic?: string | null;
	readonly qty_in_kg_mkt?: string | null;
}

export interface IDivisionReport {
	readonly id?: number;
	readonly item_id: number;
	readonly divisi: string;
	readonly credit_limit?: string | null;
	readonly cl_group?: string | null;
}
export class DivisionReportDTO implements IDivisionReport {
	readonly id?: number;
	readonly item_id: number;
	readonly divisi: string;
	readonly credit_limit?: string | null;
	readonly cl_group?: string | null;
}

export interface IPriceReport {
	readonly id?: number;
	readonly item_id: number;
	readonly price: number;
	readonly disc_percent?: number | null;
	readonly disc_value?: number | null;
	readonly line_discount?: number | null;
	readonly header_disc?: number | null;
	readonly total?: number | null;
	readonly tax_code?: string | null;
	readonly tax: number;
	readonly total_and_tax: number;
	readonly include_tax: number;
}

export class PriceReportDTO implements IPriceReport {
	readonly id?: number;
	readonly item_id: number;
	readonly price: number;
	readonly disc_percent?: number | null;
	readonly disc_value?: number | null;
	readonly line_discount?: number | null;
	readonly header_disc?: number | null;
	readonly total?: number | null;
	readonly tax_code?: string | null;
	readonly tax: number;
	readonly total_and_tax: number;
	readonly include_tax: number;
}

export interface ICustomerReport {
	readonly id?: number;
	readonly division_id: number;
	readonly invoicing_name_custom: string;
	readonly group_city?: string | null;
	readonly group_county?: string | null;
	readonly group_state?: string | null;
	readonly credit_limit?: string | null;
	readonly cl_group?: string | null;
}

export class CustomerReportDTO implements ICustomerReport {
	readonly id?: number;
	readonly division_id: number;
	readonly invoicing_name_custom: string;
	readonly group_city?: string | null;
	readonly group_county?: string | null;
	readonly group_state?: string | null;
	readonly credit_limit?: string | null;
	readonly cl_group?: string | null;
}

export interface IShipperReport {
	readonly id?: number;
	readonly division_id: number;
	readonly kota: string;
	readonly propinsi?: string | null;
	readonly sales_district_id?: string | null;
	readonly district?: string | null;
	readonly term?: string | null;
	readonly pay_status?: string | null;
	readonly closed_date?: string | null;
	readonly note_1?: string | null;
	readonly note_2?: string | null;
	readonly note_3?: string | null;
	readonly created_at?: Date | null;
	readonly updated_at?: Date | null;
}

export class ShipperReportDTO implements IShipperReport {
	readonly id?: number;
	readonly division_id: number;
	readonly kota: string;
	readonly propinsi?: string | null;
	readonly sales_district_id?: string | null;
	readonly district?: string | null;
	readonly term?: string | null;
	readonly pay_status?: string | null;
	readonly closed_date?: string | null;
	readonly note_1?: string | null;
	readonly note_2?: string | null;
	readonly note_3?: string | null;
	readonly created_at?: Date | null;
	readonly updated_at?: Date | null;
}
