import React, {useContext} from "react";
import {ModalContext} from "../components/ModalContext";
import {useBrokers} from "../hooks/brokers";
import {Table} from "../components/Table";
import {Modal} from "../components/Modal";
import {CreateBroker} from "../components/CreateBroker";
import {Broker} from "../components/content/Broker";

function TableRowBrokers() {
    return (
        <>
            <div className='table__header_broker'>
                <div className='header__elem'>Name</div>
                <div className='header__elem'>Balance</div>
                <div className='header__elem'>Options</div>
            </div>
        </>
    )
}

function TableContentBrokers({brokers, onDelete}) {
    return (
        <>
            {brokers.map((broker) => (
                <Broker onDelete={onDelete} broker={broker} key={broker.id}></Broker>
            ))}
        </>
    )
}

export function BrokersPage() {
    const {modal, open: openModal, close: closeModal} = useContext(ModalContext)
    const {brokers, addBroker, deleteBroker} = useBrokers()

    const createHandler = (broker) => {
        closeModal()
        addBroker(broker)
    }

    const deleteHandler = (id) => {
        deleteBroker(id)
    }

    return (
        <>
            {modal &&
            <Modal children={<CreateBroker onCreate={createHandler}/>}
                   title={'Add new broker'}
                   onClose={closeModal}
                   className={'modal'}
            />}
            <Table title={'Brokers'}
                   tableRow={<TableRowBrokers></TableRowBrokers>}
                   tableContent={<TableContentBrokers brokers={brokers}
                                                      onDelete={deleteHandler}>
                   </TableContentBrokers>}/>
            <button className="btn" onClick={openModal}>+</button>
        </>
    )
}