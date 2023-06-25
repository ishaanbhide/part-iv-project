import spacy

nlp = spacy.load("en_core_web_sm")
print(nlp.get_pipe("ner").labels)

text = """
A rural retailer in Central Hawke’s Bay is already feeling the financial impact of flooding that knocked out a bridge and closed a highway in the weekend’s downpour.

State Highway 50 between Ongaonga and Tikokino closed overnight Friday-Saturday after a large part of the road and the Waipawa River Bridge abutment was washed away, due to the Waipawa River flooding.

Waka Kotahi NZ Transport Agency said it can’t give any idea on how long it will take to fix.

Jasmine Carr, who works in the Ongaonga General Store, said the shop was “down to half our normal business” since the highway closure reduced traffic flows on Saturday.

“It was quite noticeable, it’s very quiet,” Carr said.

The closure would also impact school trips this week. “It makes it really awkward because I take my kids to school in Tikokino, which is normally a nine-minute trip, but now I’ll need to drive into Waipawa and take the longer route, which takes about 27 minutes.

“I’m really not impressed that my petrol bill is going to go up.”

She said other parents of schoolkids in the settlement are similarly affected.
"""

doc = nlp(text)

for entity in doc.ents:
    if entity.label_ == "GPE" or entity.label_ == "LOC" or entity.label_ == "FAC" or entity.label_ == "NORP":
        print(entity.text)
