import { FindSuggestionController } from '@controllers/Suggestion/FindSuggestionController';

function FindSuggestionControllerFactory() {
  const findSuggestionController = new FindSuggestionController();

  return findSuggestionController;
}

const findSuggestionController = FindSuggestionControllerFactory();

export { findSuggestionController };
