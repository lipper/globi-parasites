'use strict';
const db = require('arangojs')();

//tag freeliving target

db.query(`for doc in interaction_tsv
          filter doc.interactionTypeName == 'preyedUponBy' ||
          doc.interactionTypeName == 'ectoParasitoid' ||
          doc.interactionTypeName == 'parasiteOf' ||
          doc.interactionTypeName == 'ectoParasiteOf' ||
          doc.interactionTypeName == 'kleptoparasiteOf' ||
          doc.interactionTypeName == 'visitsFlowersOf' ||
          doc.interactionTypeName == 'endoparasitoidOf' ||
          doc.interactionTypeName == 'parasitoidOf' ||
          doc.interactionTypeName == 'endoparasiteOf'
          return doc`, {}, { ttl: 1000 * 3600 }).then(tagFreelivingT); //filter for interaction; ie isparasyte

function tagFreelivingT(cursor) {
    if (!cursor.hasNext()) { console.log('Finished / reached last entry'); return };
    cursor.next().then(doc => {
        try {db.query(`UPDATE "${doc._key}" WITH { freeliving: 1,
                                                   directionF: 'target',
                                                   fname: '${doc.targetTaxonName}' } IN interaction_tsv`);
        } catch (e) { }
        tagFreelivingT(cursor);
    });
}
