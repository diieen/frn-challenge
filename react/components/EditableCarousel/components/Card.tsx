import React from 'react';
import { Link } from 'vtex.render-runtime';

import styles from '../style.css';

const Card = ({ image, imageAlt, title, text, link }: CarouselItem) => {
    return (
        <article className={`${styles.card} bg-base pa4 br3 ba b--muted-5 h-100 flex flex-column`}>
            <div className="mb3">
                <img
                    className={`${styles.image} w-100 br2`}
                    src={image}
                    alt={imageAlt || title || 'Card'}
                    loading="lazy"
                />
            </div>

            {title && <h3 className="t-heading-4 mt0 mb2">{title}</h3>}
            {text && <p className="t-body lh-copy mt0 mb3">{text}</p>}

            {link?.url && (
                <Link
                    className="link c-link flex items-center"
                    href={link.url}
                    target={link.openNewTab ? '_blank' : '_self'}
                    rel={link.openNewTab ? 'noreferrer noopener' : undefined}
                >
                    {link.label || 'Saiba mais'}
                    <span className="ml2">→</span>
                </Link>
            )}
        </article>
    )
};

export default Card;