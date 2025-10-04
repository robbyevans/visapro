require 'rails_helper'

RSpec.describe Document, type: :model do
  it { should belong_to(:application) }
  it { should define_enum_for(:doc_type).with_values(passport: 0, invitation_letter: 1) }

  it "is valid with required fields" do
    expect(build(:document)).to be_valid
  end
end
