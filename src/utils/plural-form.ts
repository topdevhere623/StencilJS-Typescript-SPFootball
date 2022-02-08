import { Language, Plural } from 'ftb-models';

export const getAgePluralForm = (age: number) => {
  return new Plural(Language.ru, 'год', 'года', 'лет').getForm(age);
};
