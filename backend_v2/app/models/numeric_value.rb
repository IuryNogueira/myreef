# frozen_string_literal: true

# == Schema Information
#
# Table name: numeric_values
#
#  id              :bigint           not null, primary key
#  deleted_at      :datetime
#  value           :decimal(10, 2)   not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  range_sensor_id :bigint           not null
#
# Indexes
#
#  index_numeric_values_on_range_sensor_id  (range_sensor_id)
#
# Foreign Keys
#
#  fk_rails_...  (range_sensor_id => range_sensors.id)
#
class NumericValue < ApplicationRecord
  belongs_to :range_sensor

  validates :value, presence: true, numericality: true

  delegate :user, to: :range_sensor

  scope :outside_of_range, lambda { |min, max|
    where("value > ? AND value < ?", min, max)
  }

  scope :created_after, lambda { |date|
    where("created_at > ?", date)
  }
end
