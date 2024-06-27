import { useEffect, useState } from 'react';
import { ErrorMessage } from '../../../shared/components/ErrorMessage/ErrorMessage.component';
import { useBrandOnePayment, useCheckout } from './mocks';
import { Skeleton } from '../../../shared/components/Skeleton/Skeleton.component';
import { Button } from '../../../shared/components/Button/Button.component';

export const BrandPageOne = () => {
  const [
    getCheckoutInfo,
    { data: checkoutData, isLoading, onBillingAddressUpdate }
  ] = useCheckout();
  const [
    makePayment,
    { isError: hasPaymentFailed, isSuccess: hasPaymentSucceeded }
  ] = useBrandOnePayment();
  const [showBillingAddress, setShowBillingAddress] = useState(false);

  useEffect(() => {
    if (checkoutData?.billingAddress !== undefined) {
      setShowBillingAddress(true);
    }
  }, [checkoutData?.billingAddress]);

  useEffect(() => {
    getCheckoutInfo();
  }, []);

  useEffect(() => {
    if (hasPaymentSucceeded) {
      alert('Payment succeeded brand one');
    }
  }, [hasPaymentSucceeded]);

  const onAddBillingAddress = () => {
    setShowBillingAddress(true);
  };

  const onCancel = () => {
    setShowBillingAddress(false);
  };

  const onMakePaymentClick = () => {
    makePayment();
  };

  if (isLoading) {
    return (
      <div className="loading-component max-w-80">
        <Skeleton height="h-4" />
        <Skeleton height="h-6" />
        <Skeleton height="h-6" />
      </div>
    );
  }

  return (
    <main className="max-w-80">
      <h1 className="text-xl font-semibold">Payment Page</h1>
      <p className="text-md mb-2">
        Please see your selected options from the previous steps
        before continuing.
      </p>

      {hasPaymentFailed && <ErrorMessage message="Payment failed" />}

      <section className="my-6">
        <h2 className="text-lg font-semibold mb-2">
          Delivery Details
        </h2>
        <address className="border border-grey-300 rounded-md p-3 mb-2 block">
          <p>{checkoutData?.deliveryAddress.displayAddress}</p>
        </address>

        {!showBillingAddress && (
          <div className="flex flex-col gap-2">
            <Button onClick={onAddBillingAddress}>
              Add different billing address
            </Button>
          </div>
        )}

        {showBillingAddress && (
          <>
            {checkoutData?.billingAddress && (
              <address className="border border-grey-300 rounded-md p-3 mb-2 block">
                <p>{checkoutData?.billingAddress?.displayAddress}</p>
              </address>
            )}
            {!checkoutData?.billingAddress && (
              <div className="flex flex-col gap-2">
                <Button onClick={onBillingAddressUpdate}>
                  Add new billing address
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
              </div>
            )}
          </>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Make Payment</h2>
        <Button onClick={onMakePaymentClick}>Pay now</Button>
      </section>
    </main>
  );
};

export const BrandPageTwo = () => {
  return null;
};
