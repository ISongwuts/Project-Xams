import { EyeFilledIcon, EyeOffFilledIcon } from "@/components/icons";
import { usernameIsExist } from "@/services/actions/form-action.auth";
import { usernameSchema } from "@/services/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { Input } from '@nextui-org/input'
import { useState, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface UsernameValidationPropsType {
    setDiabled: Dispatch<SetStateAction<boolean>>
}

const PasswordValidationForm = (props: UsernameValidationPropsType) => {
    const [isHidden, setIsHidden] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(usernameSchema),
    });

    const usernameHandler = async (formData: any) => {
        
    };

    return (
        <form className='flex flex-col gap-2' onSubmit={handleSubmit(usernameHandler)}>
            <Input
                {...register('password')}
                label='Password'
                type={isHidden ? `password` : `text`}
                variant='underlined'
                endContent={
                    <Tooltip color='primary' content="Check username is exists">
                        <Button type='button' className=' bg-transparent' isIconOnly={true} onClick={()=>setIsHidden(prev => !prev)}>
                            {!isHidden ? <EyeFilledIcon size={20} /> : <EyeOffFilledIcon />}
                        </Button>
                    </Tooltip>
                }
            />
            <Input
                {...register('confirmPassword')}
                errorMessage={errors['password'] && String(errors['password']?.message)}
                label='Confirm Password'
                type={isHidden ? `password` : `text`}
                variant='underlined'
                description='Please make sure that confirm password is match the password above.'
            />
        </form>
    );
};

export default PasswordValidationForm