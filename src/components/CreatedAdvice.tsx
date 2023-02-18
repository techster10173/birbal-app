import { getCreatedAdvices, deleteAdvice } from '../services/AdviceService';
import AdviceList from './AdviceList';

const CreatedAdvice = () => <AdviceList message="Delete" getAdvice={getCreatedAdvices} removeAdvice={deleteAdvice} />;

export default CreatedAdvice;
