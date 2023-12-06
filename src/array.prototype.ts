import { Join } from "./types";

export namespace ArrayPrototype {
    const _JoinDefaultParamter = "," as const;

    /**
		 * type-safe join.
		 * 
		 * @example ArrayPrototype.join(["a", "b"]);
		 * @example ArrayPrototype.join(["a", "b"] as const);

		 * @param arr 
		 * @param separator 
		 * @returns 
		 */
    export function join<
        Container extends readonly (string | number)[] | (string | number)[],
        Separator extends string = ","
    >(
        arr: Container,
        separator: Separator = _JoinDefaultParamter as Separator
    ): Join<Container, Separator> {
        return arr.join(separator) as Join<Container, Separator>;
    }
}
