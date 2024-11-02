import { useEffect, useState } from 'react'
import { CiStar, CiUser } from 'react-icons/ci'
import { readAllTestimonialsToJson, Testimonial } from '../../data/datas';
import { useTranslation } from 'react-i18next';

export default function Testimonials() {

    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchTestimonials = async () => {
            const data = await readAllTestimonialsToJson();
            setTestimonials(data);
        };
        fetchTestimonials();
    }, []);

    return (
        <div>
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                    <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        {t("components.testimonials.title")}
                    </h2>

                    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
                        {testimonials.map((testimonial) => (
                            <blockquote key={testimonial.id} className="container rounded-lg p-6 shadow-sm sm:p-8" style={{ backgroundColor: '#f9fafb' }} title={testimonial.name}>
                                <div className="flex items-center gap-4">
                                    <CiUser className="size-14 rounded-full object-cover" />
                                    <div>
                                        <div className="flex justify-center gap-0.5 text-green-500">
                                            {Array.from({ length: testimonial.rating }).map((_, index) => (
                                                <CiStar key={index} className="text-green-500" style={{ strokeWidth: 2 }} />
                                            ))}
                                        </div>
                                        <p className="mt-0.5 text-lg font-medium text-gray-900">{testimonial.name}</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-700">
                                    {testimonial.comment}
                                </p>
                            </blockquote>
                        ))}



                    </div>
                </div>
            </section>
        </div>
    )
}
