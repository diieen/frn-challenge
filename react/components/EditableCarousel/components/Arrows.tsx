import React from 'react';
import { Button, IconCaretLeft, IconCaretRight } from 'vtex.styleguide'

import styles from '../style.css';

const Arrows = () => {
    return (
        <div className="splide__arrows">
            <Button
                variation="tertiary"
                icon={<IconCaretLeft />}
                size="small"
                className={`splide__arrow splide__arrow--prev ${styles.arrow}`}
            />
            <Button
                variation="tertiary"
                icon={<IconCaretRight />}
                size="small"
                className={`splide__arrow splide__arrow--next ${styles.arrow}`}
            />
        </div>
    )
};

export default Arrows;