'use client';

import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { useMarketingModal } from '~/hooks/useMarketingModal';
import { Form, GetMarketingModalDataQueryResult } from '~/sanity.types';

import { PageComponentProps } from '~/types';
import { PlainFormBuilder } from '../blocks/form-builder';

type MarketingModalProps = PageComponentProps<GetMarketingModalDataQueryResult>;

export const MarketingModal: FC<MarketingModalProps> = ({ data }) => {
  const { title, description, form } = data ?? {};
  const { isOpen, close } = useMarketingModal('newsletter', 2000);

  return (
    <Dialog modal open={isOpen} onOpenChange={close}>
      <DialogContent className="max-h-[calc(100vh-20rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <PlainFormBuilder {...(form as Form)} onSubmit={close} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
