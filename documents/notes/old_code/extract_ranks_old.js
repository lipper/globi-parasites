'use strict';

var db = require('arangojs')();

db.query(`
INSERT {
        _key: "691846",
        name: "Metazoa",
        rank: "Kingdom"
    } INTO rank_extract OPTIONS { ignoreErrors: true }`);

// phlyum - class - order - family - genus

async function counting() {
    

        let phylla = await db.query(`
        FOR v,e IN 1..100 outbound 'nodes_otl/691846' edges_otl
        FILTER v.rank == 'phylum'
        INSERT v IN rank_extract OPTIONS { ignoreErrors: true }
        INSERT {
        _from: "rank_extract/691846",
        _to: concat('rank_extract/', v._key)
        } INTO rank_extracte OPTIONS { ignoreErrors: true }
        return v
        `);

            Object.keys(phylla._result).forEach(async function (key) {
            let classs = await db.query(`
            FOR v,e IN 1..100 outbound 'nodes_otl/${phylla._result[key]._key}' edges_otl
            FILTER v.rank == 'class'
            INSERT v IN rank_extract OPTIONS { ignoreErrors: true }
            INSERT {
            _from: "rank_extract/${phylla._result[key]._key}",
            _to: concat('rank_extract/', v._key)
            } INTO rank_extracte OPTIONS { ignoreErrors: true }
            return v
            `);
                Object.keys(classs._result).forEach(async function (key) {
                let order = await db.query(`
                FOR v,e IN 1..100 outbound 'nodes_otl/${classs._result[key]._key}' edges_otl
                FILTER v.rank == 'order'
                INSERT v IN rank_extract OPTIONS { ignoreErrors: true }
                INSERT {
                _from: "rank_extract/${classs._result[key]._key}",
                _to: concat('rank_extract/', v._key)
                } INTO rank_extracte OPTIONS { ignoreErrors: true }
                return v
                `);
                    Object.keys(order._result).forEach(async function (key) {
                    let family = await db.query(`
                    FOR v,e IN 1..100 outbound 'nodes_otl/${order._result[key]._key}' edges_otl
                    FILTER v.rank == 'family'
                    INSERT v IN rank_extract OPTIONS { ignoreErrors: true }
                    INSERT {
                    _from: "rank_extract/${order._result[key]._key}",
                    _to: concat('rank_extract/', v._key)
                    } INTO rank_extracte OPTIONS { ignoreErrors: true }
                    return v
                    `);/*
                        Object.keys(family._result).forEach(async function (key) {
                        let genus = await db.query(`
                        FOR v,e IN 1..100 outbound 'nodes_otl/${family._result[key]._key}' edges_otl
                        FILTER v.rank == 'genus'
                        INSERT v IN rank_extract OPTIONS { ignoreErrors: true }
                        INSERT {
                        _from: "rank_extract/${family._result[key]._key}",
                        _to: concat('rank_extract/', v._key)
                        } INTO rank_extracte OPTIONS { ignoreErrors: true }
                        return v
                        `);
                            Object.keys(genus._result).forEach(async function (key) {
                            let species = await db.query(`
                            FOR v,e IN 1..100 outbound 'nodes_otl/${genus._result[key]._key}' edges_otl
                            FILTER v.rank == 'species'
                            INSERT v IN rank_extract OPTIONS { ignoreErrors: true }
                            INSERT {
                            _from: "rank_extract/${genus._result[key]._key}",
                            _to: concat('rank_extract/', v._key)
                            } INTO rank_extracte OPTIONS { ignoreErrors: true }
                            return v
                            `);

                            })
                        })*/
                    })
                })
            
        //console.log(kingdomcount._result[key].name, kingdomcount._result[key]._key, countp._result, countf._result); // kingdoms
    })
}
counting();