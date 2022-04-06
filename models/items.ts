import { DB_Entry } from "../protected/db";
const { TABLES, getEntries, storeEntry, deleteEntry, findEntry } = require('../protected/db')
const { deleteItemOffers } = require('./offers')
const TABLE_NAME: typeof TABLES = TABLES.items

/**
 * Item interface
 */
export interface ItemProps extends DB_Entry {
  name: string,
  price: number
}

/**
 * Get all items.
 *
 * @return Array<ItemProps>
 */
const getItems = async (): Promise<Array<ItemProps>> => {
  return getEntries(TABLE_NAME)
}

/**
 * Get item by name.
 *
 * @param name
 * @return ItemProps|null
 */
const getItemByName = async (name: string): Promise<ItemProps> => {
  return await findEntry(TABLE_NAME, 'name', name)
}

/**
 * Store item in database.
 *
 * @param item
 * @return ItemProps
 */
const storeItem = async (item: ItemProps): Promise<ItemProps> => {
  const entry = await findEntry(TABLE_NAME, 'name', item.name)
  return entry || storeEntry(TABLE_NAME, item)
}

/**
 * Delete item by name. To prevent duplication of logic, function
 * just only find an entry and call another delete entry function by ID
 *
 * @param name
 * @return number
 */
const deleteItemByName = async (name: string): Promise<number> => {
  const entry = await getItemByName(name)

  if (entry) {
    return await deleteItemById((entry as any)['id'])
  }

  return 0
}

/**
 * Delete item by ID.
 *
 * @param id
 * @return number
 */
const deleteItemById = async  (id: number): Promise<number> => {
  await deleteItemOffers(id)
  return deleteEntry(TABLE_NAME, 'id', id)
}

module.exports = {
  getItems,
  getItemByName,
  storeItem,
  deleteItemByName,
  deleteItemById
}
