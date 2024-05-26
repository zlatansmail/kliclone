import React from "react";
import '../../App.css';
import './hashtag-slider.css';

const HashtagSlider = ({ logo, tags }) => {
    return (

        <div className="hashtag-slider">
            <img src={logo} alt="Hashtag Slider Logo" className="hashtag-slider-logo" />
            <ul className="hashtag-list">
                {tags.map((tag) => (
                    <li key={tag} className="hashtag-item">
                        # {tag.toUpperCase()}
                    </li>
                ))}
            </ul>
        </div>

    );
};

HashtagSlider.defaultProps = {
    logo: './klixposao.png',
    tags: ['najnovije', 'vijesti', 'tehnologija', 'BiH', 'Sarajevo'],
};

export default HashtagSlider;