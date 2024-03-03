import React from 'react'
import StoreCardHorizontal from './StoreCardHorizontal'
import SmallSetPaginationSearch from '../pagination/SmallSetPaginationSearch'

function StoreList({ stores, get_store_list_page, slug, search, count }) {
  return (
    <div className="overflow-hidden px-8">
      <ul role="list" className="space-y-8 gap-8 ">
      {stores&&stores.map((store,index) => (
          <StoreCardHorizontal data={store} key={index} index={index}/>
        ))}
      </ul>
      <SmallSetPaginationSearch list_page={get_store_list_page} slug={slug} search={search} list={stores} count={count} />
    </div>
  )
}

export default StoreList