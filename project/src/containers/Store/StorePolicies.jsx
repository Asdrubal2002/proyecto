import React from 'react'
import { connect } from "react-redux";
import Layout from '../../hocs/Layout';
import { get_store_policies } from '../../redux/actions/stores';
import { Link, useParams } from "react-router-dom";
import { useEffect } from 'react';
import { InfinitySpin, Rings } from 'react-loader-spinner';
import FooterStores from '../../components/store/FooterStores';


function StorePolicies({
    get_store_policies,
    policy,
    loading,
    store
}) {

    const params = useParams()
    const storeSlug = params.storeSlug

    useEffect(() => {
        window.scrollTo(0, 0)

        get_store_policies(storeSlug)
    }, [])

    return (
        <Layout>
            <div className="relative isolate overflow-hidden px-6 py-20 sm:py-20 lg:overflow-visible lg:px-0 font-estilo_letra">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="lg:max-w-lg">
                                <p className="text-base font-semibold leading-7 text-azul_corp_ho">Ten en cuenta:</p>
                                <h1 className="mt-2 text-4xl text-gray-200 sm:text-3xl">
                                    Las políticas de <strong>{storeSlug}</strong></h1>
                                <p className="mt-6 leading-8 text-gray-300 text-base">
                                    Estas políticas son las garantías establecidas para los compradores en caso de cualquier problema con la tienda. Si surge algún problema, el cliente puede confiar en que se seguirán estas políticas para resolverlo de manera justa y adecuada                                </p>                            </div>
                        </div>
                    </div>
                    <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <img
                            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                            src={store && store.banner}
                            alt=""
                        />
                    </div>
                    {
                        loading ? <>
                            <InfinitySpin width={290} height={200} color="#fff" radius="6" />
                        </> :
                            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                                <div className="lg:pr-4">
                                    <div className="max-w-xl text-base leading-7 text-gray-300 lg:max-w-lg">
                                        {policy !== null && policy.length > 0 ? (
                                            <ul role="list" className="space-y-8 text-gray-400">
                                                {policy.map((policyItem, index) => (
                                                    <li key={index} className="flex gap-x-3">
                                                        {/* <LockClosedIcon className="mt-1 h-5 w-5 flex-none text-azul_corp_ho" aria-hidden="true" /> */}
                                                        <span>
                                                            <strong className="font-semibold text-azul_corp_ho">{policyItem.name}</strong>
                                                            <p className="text-base text-gray-400">{policyItem.policy_text}</p>
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No hay políticas disponibles para esta tienda.</p>
                                        )}
                                    </div>

                                </div>
                            </div>
                    }
                </div>
            </div>
            <FooterStores store={store}/>

        </Layout>
    )
}

const mapStateToProps = state => ({
    store: state.Stores.store,

    policy: state.Stores.policies,
    loading: state.Stores.loading,

})

export default connect(mapStateToProps, {
    get_store_policies
})(StorePolicies)