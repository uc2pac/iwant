import GiftCard from '../gift-card';
import { gifts } from '../../mock';

export default () => 
<div className="gift-card-list">
    { gifts.map(({_id, title, description, imageUri, public: isPublic}) => 
        <GiftCard 
            key={_id}
            title={title}
            description={description}
            imageUri={imageUri}
            isPublic={isPublic}
        />
    ) }
</div>