import { DeleteSuggestionController } from '@controllers/Suggestion/DeleteSuggestionController';

function DeleteSuggestionControllerFactory() {
  const deleteSuggestionController = new DeleteSuggestionController();

  return deleteSuggestionController;
}

const deleteSuggestionController = DeleteSuggestionControllerFactory();

export { deleteSuggestionController };
