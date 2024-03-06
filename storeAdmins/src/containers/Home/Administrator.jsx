import React from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'

function Administrator() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">
      Admin Hello 1:29:42
      </h1>
    </Layout>

  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {

})(Administrator)
