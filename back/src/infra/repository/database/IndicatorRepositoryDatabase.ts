import { Indicator } from '@/domain/entity'
import { IndicatorRepository } from '@/domain/repository'
import { Connection } from '@/infra/database'

export class IndicatorRepositoryDatabase implements IndicatorRepository {
  constructor (readonly connection: Connection) {}

  async remove (idIndicator: number): Promise<void> {
    await this.connection.query('DELETE FROM indicators WHERE id = $1', [idIndicator])
  }

  async save (indicator: Indicator): Promise<void> {
    await this.connection.query(`INSERT INTO indicators
    (
      name,
      unit,
      description,
      current_value,
      accepted_value,
      min_value,
      max_value
    ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [
      indicator.name,
      indicator.unit,
      indicator.description,
      indicator.currentValue,
      indicator.acceptedValue,
      indicator.minValue,
      indicator.maxValue
    ])
  }

  async list (): Promise<Indicator[]> {
    const indicatorsData = await this.connection.query('SELECT * FROM indicators', [])
    const indicators: Indicator[] = []
    for (const indicatorData of indicatorsData) {
      indicators.push(new Indicator(
        indicatorData.id,
        indicatorData.name,
        indicatorData.unit,
        indicatorData.description,
        indicatorData.currentValue,
        indicatorData.acceptedValue,
        indicatorData.minValue,
        indicatorData.maxValue
      ))
    }
    return indicators
  }

  async get (idIndicator: number): Promise<Indicator> {
    const [indicatorData] = await this.connection.query('SELECT * FROM indicators WHERE id = $1', [idIndicator])
    const indicator = new Indicator(indicatorData.id, indicatorData.name, indicatorData.unit, indicatorData.description, Number(indicatorData.current_value), Number(indicatorData.accepted_value), Number(indicatorData.min_value), Number(indicatorData.max_value))
    return indicator
  }

  async clean (): Promise<void> {
    await this.connection.query('DELETE FROM indicators', [])
  }
}
