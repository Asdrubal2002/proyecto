import React, { useEffect, useState } from 'react';
import { Rings } from 'react-loader-spinner';
import { connect } from 'react-redux';
import Layout from '../../hocs/Layout';
import { useParams } from 'react-router-dom';
import { get_invoice } from '../../redux/actions/invoices/invoices';



function InvoiceDetail({
    get_invoice,
    invoice
}) {
    const params = useParams()
    const transaction_number = params.transaction_number

    useEffect(() => {
        get_invoice(transaction_number)
       
    }, []);
    
    return (
        <Layout>
           detail
           {transaction_number}
        </Layout>
    );
}

const mapStateToProps = state => ({
   invoice: state.Invoices.invoice

});

export default connect(mapStateToProps, {
    get_invoice
})(InvoiceDetail);
