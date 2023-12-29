import { CreateSuggestionController } from '@controllers/Suggestion/CreateSuggestionController';

function CreateSuggestionControllerFactory() {
  const createSuggestionController = new CreateSuggestionController();

  return createSuggestionController;
}

const createSuggestionController = CreateSuggestionControllerFactory();

export { createSuggestionController };
