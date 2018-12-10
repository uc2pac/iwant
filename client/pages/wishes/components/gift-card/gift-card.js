import './gift-card.scss';

export default (props) => 
<div className="card d-flex flex-row justify-content-start">
    <div className="card-img-left">
        <img src={props.imageUri} alt="Card image cap" />
    </div>
    <div className="card-body d-flex flex-column justify-content-between">
        <div>
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description.substring(0, 300)}</p>
        </div>
        <div className="text-right">
            <p className="card-text">
                { props.isPublic && 
                    <small className="text-muted">
                        <a href="#">Public</a>
                    </small>
                }
            </p>
        </div>
    </div>
</div>