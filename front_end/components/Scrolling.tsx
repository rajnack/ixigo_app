import Image from 'next/image';
import { Phone, BadgePercent } from 'lucide-react';
import styles from './ScrollingInfoBox.module.css';

const ScrollingInfoBox = () => {
    const infoItems = [
        {
            icon: <Phone className="text-green-500" height={20} width={20} />,
            text: "24x7 Customer Support",
        },
        {
            icon: (
                <Image
                    src="/images/thumbs.svg"
                    alt="thumbs"
                    width={25}
                    height={20}
                    className="object-cover w-[25px] h-[20px] text-green-500"
                />
            ),
            text: "Hassle-Free Bookings",
        },
        {
            icon: <BadgePercent className="text-green-500" width={20} height={20} />,
            text: "Best Flight Offers",
        },
    ];

    return (
        <div className={styles.scrollingWordsContainer}>
            <div className={styles.scrollingWordBox}>
                <ul className={styles.scrollingWordBoxUl}>
                    {infoItems.map((item, index) => (
                        <li key={index} className={styles.scrollingWordBoxItem}>
                            <div className="body-sm flex gap-4 items-center textStyle">
                                {item.icon}
                                <span>{item.text}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ScrollingInfoBox;
