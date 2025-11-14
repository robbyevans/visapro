class AddInvoiceIdToApplications < ActiveRecord::Migration[7.2]
  def change
    add_reference :applications, :invoice, null: true, foreign_key: true
  end
end
