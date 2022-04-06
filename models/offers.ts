import { DB_Entry } from "../protected/db";
const { TABLES, getEntries, storeEntry, deleteEntry, findEntry, findEntries } = require('../protected/db')
const TABLE_NAME: typeof TABLES = TABLES.offers

/**
 * Item interface
 */
interface OfferProps extends DB_Entry {
  itemId: number,
  size: number,
  specialPrice: number
}

/**
 * Create new offer.
 *
 * @param props
 * @return DB_Entry
 */
const createOffer = async (props: OfferProps): Promise<OfferProps> => {
  const { itemId, size, specialPrice } = props
  const offer: OfferProps = {
    itemId, size, specialPrice
  } as OfferProps

  return await storeEntry(TABLE_NAME, offer)
}

/**
 * Update exists offer.
 *
 * @param props
 * @return DB_Entry
 */
const updateOffer = async (props: OfferProps): Promise<OfferProps> => {
  const { id, itemId, size, specialPrice } = props
  const offer: OfferProps = {
    id, itemId, size, specialPrice
  } as OfferProps

  return await storeEntry(TABLE_NAME, offer)
}

/**
 * Delete all item offers
 *
 * @param itemId
 * @return number
 */
const deleteItemOffers = async (itemId: number): Promise<number> => {
  return await deleteEntry(TABLE_NAME, 'itemId', itemId)
}

/**
 * Get all item offers.
 *
 * @param itemId
 * @return Array
 */
const getItemOffers = async (itemId: number): Promise<Array<OfferProps>> => {
  return await findEntries(TABLE_NAME, 'itemId', itemId)
}

module.exports = {
  createOffer,
  updateOffer,
  deleteItemOffers,
  getItemOffers
}
