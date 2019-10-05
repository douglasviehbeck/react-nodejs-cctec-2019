import React from 'react';

export default function Produto(props, events, e, d) {
    return (
        <div className="card" style={{marginTop: 10, padding: 10}}>
            <div className="container row">
                <div className="col-6">
                    <div>{props.produto.nome}</div>
                    <div>{props.produto.descricao}</div>
                </div>
                <div className="col-6 align-items-center d-flex justify-content-end">
                    <button className="btn btn-danger" onClick={() => props.onDelete(props.produto.id)}>X</button>
                </div>
            </div>
        </div>
    );
};