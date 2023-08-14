import React from 'react';
import { AppStoreLogos } from './AppStoreLogos';

interface iProps {
  size: 'small' | 'medium' | 'large';
  brand: 'apple' | 'google' | 'huawei';
  type: 'black' | 'white' | 'brand';
}

interface iBtn {
  brand: 'apple' | 'google' | 'huawei';
  type: 'black' | 'white' | 'brand';
}

const getImage = (props: iBtn) => {
  const { brand, type } = props;

  let use: JSX.Element =
    brand === 'apple' ? (
      type === 'black' ? (
        AppStoreLogos.black.apple
      ) : type === 'white' ? (
        AppStoreLogos.white.apple
      ) : type === 'brand' ? (
        AppStoreLogos.brand.apple
      ) : (
        <></>
      )
    ) : brand === 'google' ? (
      type === 'black' ? (
        AppStoreLogos.black.google
      ) : type === 'white' ? (
        AppStoreLogos.white.google
      ) : type === 'brand' ? (
        AppStoreLogos.brand.google
      ) : (
        <></>
      )
    ) : brand === 'huawei' ? (
      type === 'black' ? (
        AppStoreLogos.black.huawei
      ) : type === 'white' ? (
        AppStoreLogos.white.huawei
      ) : type === 'brand' ? (
        AppStoreLogos.brand.huawei
      ) : (
        <></>
      )
    ) : (
      <></>
    );

  return use;
};

const Large = (props: iBtn) => {
  const { brand, type } = props;

  return <button className='h-[40px] w-[120px] relative'>{getImage({ brand, type })}</button>;
};

const Medium = (props: iBtn) => {
  const { brand, type } = props;
  return <button className='h-[60px] w-[180px] relative'>{getImage({ brand, type })}</button>;
};

const Small = (props: iBtn) => {
  const { brand, type } = props;
  return <button className='h-[30px] w-[92px] relative'>{getImage({ brand, type })}</button>;
};

export default function MwebButtonAppStore(props: iProps) {
  const { brand, size, type } = props;

  return (
    <>
      {size === 'large' ? (
        <Large brand={brand} type={type} />
      ) : size === 'medium' ? (
        <Medium brand={brand} type={type} />
      ) : size === 'small' ? (
        <Small brand={brand} type={type} />
      ) : (
        <></>
      )}
    </>
  );
}
