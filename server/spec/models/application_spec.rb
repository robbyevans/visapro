require 'rails_helper'

RSpec.describe Application, type: :model do
  it { should belong_to(:user) }
  it { should belong_to(:athlete) }
  it { should have_many(:documents).dependent(:destroy) }

  it { should define_enum_for(:status).with_values(pending: 0, approved: 1, rejected: 2, invoiced: 3) }

  it "is invalid without a country" do
    app = build(:application, country: nil)
    expect(app).to_not be_valid
    expect(app.errors[:country]).to include("can't be blank")
  end
end
