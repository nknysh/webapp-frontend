import buttons from './buttons';
import content from './content';
import currency from './currency';
import form from './form';
import labels from './labels';
import messages from './messages';
import notifications from './notifications';
import plurals from './plurals';
import sections from './sections';
import taglines from './taglines';

export default {
  translation: {
    title: 'Pure Escapes',
    description:
      'Pure Escapes is a full-service destination management company with over 10 years’ experience and expertise across the Indian Ocean. We are dedicated and trusted to creating and delivering the ultimate travel experiences for the most discerning travellers. As the only luxury specialist wholesaler in the Indian Ocean, we have built an extensive network over the years and have long-standing relationships with leading luxury resorts and service providers.',

    percentage: 'Percentage',
    flatRate: 'Flat rate',

    mealTypes: {
      bb: 'Breakfast Included',
      hb: 'Breakfast & Dinner (Drinks excluded)',
      fb: '3 meals per day (Drinks excluded)',
      ai: 'All Inclusive',
    },

    'Meal Plan': 'Meal Plan',

    buttons,
    content,
    currency,
    form,
    labels,
    messages,
    notifications,
    sections,
    taglines,
    ...plurals,
  },
};
