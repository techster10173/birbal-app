import { getSavedAdvices, unsaveAdvice } from '../services/AdviceService';
import AdviceList from './AdviceList';

const SavedAdvice = () => <AdviceList message="Unsave" getAdvice={getSavedAdvices} removeAdvice={unsaveAdvice} />;

export default SavedAdvice;
