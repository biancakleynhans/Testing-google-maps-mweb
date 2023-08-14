import MwebSliceContainer from '@/components/shared/MwebSliceContainer';
import OrderSummaryDesktop from '@/components/orderSummaryFibreGreen/OrderSummaryLayout';

export default function OrderSummary() {
	return (
		<MwebSliceContainer sectionId='order_summary_section' padding='px-4 md:px-[182px] py-8 md:py-16' bgColor='bg-white'>

			<OrderSummaryDesktop />
		</MwebSliceContainer>
	);
}
