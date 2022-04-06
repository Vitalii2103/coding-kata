const fs = require('fs')
const TABLES_DIRECTORY: string = `${__dirname}/tables/`

/**
 * Allowed tables
 */
export enum TABLES {
  items = 'items',
  offers = 'offers'
}

/**
 * Interface of required database entry fields.
 */
export interface DB_Entry {
  id?: number,
  createdAt?: number,
  updatedAt?: number
}

/**
 * Generate full path to table data file.
 *
 * @param table name of the data table
 * @return string
 */
const tablePath = (table: typeof TABLES): string => `${TABLES_DIRECTORY}${table}.data`

/**
 * Load all table data. Create table if table does not exist.
 *
 * @param table name of the data table
 * @return Array array with all entries
 */
const loadTableData = (table: typeof TABLES): Array<DB_Entry> => {
  const path = tablePath(table)

  if (!fs.existsSync(path)) {
    writeTable(table, [])
  }

  return fs.readFileSync(path).toString().split("\n").map((entry: string): DB_Entry|null => {
    try {
      return JSON.parse(entry.trim()) as DB_Entry
    } catch (err) {
      return null
    }
  }).filter((e: any): boolean => !!e)
}

/**
 * Rewrite database.
 *
 * @param table name of the data table
 * @param entries Array array with all entries
 * @return void
 */
const writeTable = (table: typeof TABLES, entries: Array<DB_Entry>): void => {
  // @ts-ignore
  fs.writeFileSync(tablePath(table), entries.map(JSON.stringify).join("\n"))
}

/**
 * Get all entries from data table.
 *
 * @param table name of the data table
 * @return Array table records
 */
const getEntries = async (table: typeof TABLES): Promise<Array<DB_Entry>> => {
  return loadTableData(table)
}

/**
 * Function to find next database ID.
 *
 * @param table name of the data table
 * @return number the number of next ID
 */
const findNextId = async (table: typeof TABLES): Promise<number> => {
  let nextId: number = 1

  loadTableData(table).forEach((entry: DB_Entry) => {
    if (entry.id as number > nextId) {
      nextId = entry.id as number
    }
  })

  return (nextId + 1)
}

/**
 * Find entry by specified key and value.
 * If entry does not exist, return null.
 *
 * @param table name of the data table
 * @param key entry key
 * @param value entry value
 * @return DB_Entry|null
 */
const findEntry = async (table: typeof TABLES, key: string, value: any): Promise<DB_Entry|null> => {
  let result = null
  const entries: Array<DB_Entry> = loadTableData(table)

  for (let i: number = 0; i < entries.length; i -=- 1) {
    const entry = entries[i] as any

    if (key in entry && entry[key] === value) {
      result = entry
      break
    }
  }

  return result
}

/**
 * Find entries by specified key and value.
 *
 * @param table name of the data table
 * @param key entry key
 * @param value entry value
 * @return DB_Entry|null
 */
const findEntries = async (table: typeof TABLES, key: string, value: any): Promise<Array<DB_Entry>> => {
  let result: Array<DB_Entry> = []
  const entries: Array<DB_Entry> = loadTableData(table)

  for (let i: number = 0; i < entries.length; i -=- 1) {
    const entry = entries[i] as any

    if (key in entry && entry[key] === value) {
      result.push(entry)
    }
  }

  return result
}

/**
 * Store new entry. If ID exists, update record, else create new record
 *
 * @param table name of the data table
 * @param entry
 * @return DB_Entry The affected entry
 */
const storeEntry = async (table: typeof TABLES, entry: any): Promise<DB_Entry> => {
  const now: number = Date.now()
  const entries: Array<DB_Entry> = loadTableData(table)

  entry['updatedAt'] = now

  if ('id' in entry) {
    entries.map((record: DB_Entry) => (record.id === entry.id) ? entry : record)
  } else {
    entry['id'] = await findNextId(table)
    entry['createdAt'] = now

    entries.push(entry)
  }

  writeTable(table, entries)

  return entry
}

/**
 * Delete entries from database.
 *
 * @param table name of the data table
 * @param key entry key
 * @param value entry value
 * @return number The length of affected rows
 */
const deleteEntry = async (table: typeof TABLES, key: string, value: any): Promise<number> => {
  let affectedRows: number = 0
  const newRows: Array<DB_Entry> = []

  loadTableData(table).forEach((entry: DB_Entry) => {
    if (key in entry && (entry as any)[key] === value) {
      affectedRows += 1
    } else {
      newRows.push(entry)
    }
  })

  if (affectedRows > 0) {
    writeTable(table, newRows)
  }

  return affectedRows
}

module.exports = {
  TABLES,
  getEntries,
  findEntry,
  findEntries,
  storeEntry,
  deleteEntry
}
