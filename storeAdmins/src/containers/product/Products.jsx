import React, { useEffect } from 'react'
import { connect } from "react-redux"
import Layout from '../../hocs/Layout'

function Products({
  
}) {


  useEffect(() => {
    window.scrollTo(0, 0)
    
  }, []);

  return (
    <Layout>
      1:29:38 
    </Layout>

  )
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, {
})(Products)
