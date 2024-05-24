import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Layout from '../../hocs/Layout';
import { get_store_faqs } from '../../redux/actions/stores';
import { Link, useParams } from "react-router-dom";
import { InfinitySpin } from 'react-loader-spinner';
import FooterStores from '../../components/store/FooterStores';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from "@heroicons/react/24/outline";

function Questions({ get_store_faqs, loading, store, faqs = [] }) {
    const params = useParams();
    const storeSlug = params.storeSlug;

    useEffect(() => {
        get_store_faqs(storeSlug);
        window.scrollTo(0, 0);
    }, [get_store_faqs, storeSlug]);

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredFaqs = (faqs || []).filter((faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            {loading ? (
                <InfinitySpin width={290} height={200} color="#fff" radius="6" />
            ) : (
                <div className='m-4'>
                    <input
                        type="text"
                        placeholder="Buscar preguntas..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="text-sm block w-full p-2 mb-4 bg-stone-900 rounded-lg placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-2 focus:ring-azul_corp_ho"
                    />
                    {filteredFaqs.map((faq, index) => (
                        <Disclosure key={index}>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-stone-900 px-4 py-2 text-left text-sm font-medium text-white hover:bg-stone-700 my-4">
                                        <span>{faq.question}</span>
                                        <ChevronUpIcon
                                            className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-azul_corp_ho`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 py-2 text-sm text-gray-200">
                                        <p >{faq.answer}</p>

                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </div>
            )}
            <FooterStores store={store} />
        </Layout>
    );
}

const mapStateToProps = state => ({
    store: state.Stores.store,
    faqs: state.Stores.faqs,
});

export default connect(mapStateToProps, {
    get_store_faqs
})(Questions);
