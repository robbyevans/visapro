class DropInvoiceApplicationsTable < ActiveRecord::Migration[7.2]
  def change
    drop_table :invoice_applications do |t|
      t.bigint :invoice_id
      t.bigint :application_id
      t.decimal :unit_price, precision: 10, scale: 2
      t.timestamps
    end
  end
end
