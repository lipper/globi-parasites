# GLoBIs parasites

Here is the workflow to reproduce the current findings:

**1. connect to the VM thats running arangoDB:**
```
ssh h -L 127.0.0.1:8529:127.0.0.1:8529 -p 15350 -q
```
**2. Setup arangoDB and node.v8+ and install needed packages in package.json**

**3. Run the data-building script:**
```
bash build_data.sh
```
**4. To count stuff just execute the js code in /documents**

# ToDo's

**Currently working on:**
- counts: array with all animal phylla, loop trough them update doc; count general nr of parasites inside pipeline (noott etc)
- rebuild data builder

**In the long run:**
- use simple parsimony algorithm to determine how often parasitism occurred in the evolution (of Eukaryota?) (root at phylum; jeden möglichen Baum berechnen, Anzahl der Edges mit Attribut = character change = 1 zählen)
- find out which interactionTypeName determines if a species is free living or parasitic (in documents/interaction_table.md)
- make new notes for MA

**May?**
- write master thesis as git-book? Create new book and add basic ToC and points what to include

**Future work:** (not important)
- modularize builder with option (rebuild only weinstein etc.)
- draw the graph database with sigma.js(?)
- look at the opentree for phylogeny `https://tree.opentreeoflife.org/opentree/argus/opentree9.1@ott93302`


### Notes

Link to current thesis notes: https://www.icloud.com/pages/0U8KA609rmdiKQphfj_W2TaFQ#ma

If you get an error that says that node is out of memory, run it with more: `--max_old_space_size=16384`