import Image from 'next/image';
import React from 'react';
import { iIllustrationEntry, validMwebIllustrations } from './ValidMwebIcons';
import {IllustrationComponents} from "@/components/ui/mwebIcon/MwebFunctionalIllustrations";

interface IIllustrationProps {
  size: number;
  illustrationName: string;
}

export default function MwebIconIllustration(props: IIllustrationProps) {
  const { size, illustrationName } = props;

  const selectedIllustration = illustrationName ? IllustrationComponents[illustrationName] : '';

  if (selectedIllustration) {
    return (
      <>
        {selectedIllustration(size)}
      </>
    );
  } else {
    return <></>;
  }
}
