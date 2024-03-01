import { EyeFilledIcon, EyeOffFilledIcon } from "@/components/icons";
import { infomationSchema } from "@/services/validation/schema";
import { Select, SelectItem } from "@nextui-org/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { Input } from '@nextui-org/input'
import { useState, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface InfomationValidationPropsType {
    setDiabled: Dispatch<SetStateAction<boolean>>
}

const InfomationValidationForm = (props: InfomationValidationPropsType) => {
    const [isHidden, setIsHidden] = useState<boolean>(false)
    const prefixs = ['นาย', 'นาง', 'นางสาว', "Mr.", "Mrs.", "Ms.", "Miss"]
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(infomationSchema),
    });

    const usernameHandler = async (formData: any) => {

    };


    return (
        <form className='flex flex-col gap-2' onSubmit={handleSubmit(usernameHandler)}>
            <Select
                {...register('prefix')}
                label='Prefix'
                variant='underlined'
                isRequired={true}
            >
                {
                    prefixs.map((prefix, index) => <SelectItem key={index}>{prefix}</SelectItem>)
                }
            </Select>
            <div className="flex gap-4">
                <Input
                    {...register('first_name')}
                    label='First Name'
                    variant='underlined'
                />
                <Input
                    {...register('last_name')}
                    label='Last Name'
                    variant='underlined'
                />
            </div>
            <div className="flex gap-4">
                <Input
                    {...register('tel')}
                    label='Telephone'
                    variant='underlined'
                />
            </div>
            <Input
                {...register('password')}
                label='Password'
                type={isHidden ? `password` : `text`}
                variant='underlined'
                endContent={
                    <Tooltip color='primary' content="Check username is exists">
                        <Button type='button' className=' bg-transparent' isIconOnly={true} onClick={() => setIsHidden(prev => !prev)}>
                            {!isHidden ? <EyeFilledIcon size={20} /> : <EyeOffFilledIcon />}
                        </Button>
                    </Tooltip>
                }
            />
            <Input
                {...register('confirm_password')}
                errorMessage={errors['password'] && String(errors['password']?.message)}
                label='Confirm Password'
                type={isHidden ? `password` : `text`}
                variant='underlined'
                description='Please make sure that confirm password is match the password above.'
            />
        </form>
    );
};

export default InfomationValidationForm