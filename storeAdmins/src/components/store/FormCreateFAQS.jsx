import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { get_store_faqs, get_store_policies } from '../../redux/actions/store/store';

function FormCreateFAQS({
  userStoreSlug,
  get_store_faqs,
  faqs
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    get_store_faqs(userStoreSlug);
  }, []);


  return (
    <div>
     
      {faqs !== null && faqs.length > 0 ? (
        <ol role="list" className="list-decimal space-y-8 text-gray-800">
          {faqs.map((faqsItem, index) => (
            <li key={index} className="flex gap-x-3">
              <span>
                <strong className="font-semibold text-gray-200">{index + 1}. {faqsItem.question}</strong>
                <p className="text-sm text-gray-400">{faqsItem.answer}</p>
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <p>No hay preguntas disponibles para esta tienda.</p>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  userStoreSlug: state.Store.store.slug,
  faqs: state.Store.faqs
});

export default connect(mapStateToProps, {
  get_store_faqs
})(FormCreateFAQS);
