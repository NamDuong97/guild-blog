"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ImageCarousel.module.css';

interface ImageCarouselProps {
    images: string[];
    alt: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, alt }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToSlide = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex(index);
    };

    // Single image - no carousel needed
    if (images.length === 1) {
        return (
            <img
                src={images[0]}
                alt={alt}
                className={styles.singleImage}
            />
        );
    }

    return (
        <div className={styles.carousel}>
            <div className={styles.imageWrapper}>
                <img
                    src={images[currentIndex]}
                    alt={`${alt} - ${currentIndex + 1}`}
                    className={styles.carouselImage}
                />

                {/* Counter */}
                <div className={styles.counter}>
                    {currentIndex + 1} / {images.length}
                </div>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className={`${styles.navButton} ${styles.navButtonLeft}`}
                            aria-label="Previous image"
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            onClick={goToNext}
                            className={`${styles.navButton} ${styles.navButtonRight}`}
                            aria-label="Next image"
                        >
                            <ChevronRight />
                        </button>
                    </>
                )}
            </div>

            {/* Dots Indicator */}
            {images.length > 1 && images.length <= 10 && (
                <div className={styles.dots}>
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => goToSlide(index, e)}
                            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''
                                }`}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Thumbnail Strip for many images */}
            {images.length > 10 && (
                <div className={styles.thumbnails}>
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={(e) => goToSlide(index, e)}
                            className={`${styles.thumbnail} ${index === currentIndex ? styles.thumbnailActive : ''
                                }`}
                        >
                            <img src={image} alt={`Thumbnail ${index + 1}`} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageCarousel;
