import re
from abc import ABC, abstractmethod
from typing import List


class Extractor(ABC):
    @abstractmethod
    def get_locations(self, article: str) -> List[str]:
        pass


class ExtractorFactory:
    @staticmethod
    def create_extractor(extractor: str, model) -> Extractor:
        if extractor == 'openai':
            return OpenAIExtractor(model)
        elif extractor == 'spacy':
            return SpacyExtractor(model)
        else:
            raise ValueError(f"No extractor available for site: {extractor}")


class OpenAIExtractor(Extractor):

    def __init__(self, openai):
        self.openai = openai

    def get_locations(self, article: str) -> List[str]:
        prompt = f'"""{article}""" extract searchable locations from text as bullet points. Direct answer.'
        completion = self.openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=30,
            temperature=0,
        )

        return re.findall(r'- (.+)', completion.choices[0].message.content)


class SpacyExtractor(Extractor):
    def __init__(self, nlp):
        self.nlp = nlp

    def get_locations(self, article: str) -> List[str]:
        doc = self.nlp(article)
        return list(set(ent.text for ent in doc.ents if ent.label_ in ["GPE", "LOC", "FAC"]))
