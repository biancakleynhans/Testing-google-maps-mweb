'use client';
import styles from './TopNav.module.css';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { INav, INavCategory } from '@/models/nav';

const handleLinkClick = (item: INav, router: any) => {
  if (item?.externalLink) {
    window.open(item?.targetUrl ? item.targetUrl : '#', '_blank', 'noreferrer');
  } else {
    router.push(item?.targetUrl ? item.targetUrl : '#');
  }
};

const TopNav = ({ topNavContent }: { topNavContent: INavCategory[] }) => {

  const router = useRouter();

  //
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.content} flex gap-x-8 py-3`}>
        {topNavContent?.map((item, i) => (
          <Link
            key={item.title}
            href={item.targetUrl ? item.targetUrl : '#'}
            className={`text-mwTextLinkSmall text-mwPrimary-900 no-underline hover:no-underline ${item.analyticsId}`}
            data-testid={item.analyticsId}
            onClick={(e) => {
              e?.preventDefault();
              if (item?.targetUrl) handleLinkClick(item, router);
            }}
          >
            {item.title}

            {item.categories.length > 0 &&
              item.categories.map((sub: INav) => (
                <Link
                  href=''
                  key={sub.title}
                  className={`${item.analyticsId}`}
                  data-testid={sub.analyticsId}
                  onClick={(e) => {
                    e?.preventDefault();
                    if (sub?.targetUrl) handleLinkClick(sub, router);
                  }}
                >
                  {sub.title}
                </Link>
              ))}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopNav;
