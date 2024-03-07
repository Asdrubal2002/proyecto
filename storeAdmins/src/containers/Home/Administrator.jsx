import React from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'
import StadisticsStore from '../../components/home/MyStoreNumbers'

function Administrator() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">
        <StadisticsStore/>
      </h1>
    </Layout>

  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {

})(Administrator)
